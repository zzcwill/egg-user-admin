'use strict';

const Service = require('egg').Service;

class MenuService extends Service {
  async getOrderById(id) {
    const { Order, Order_goods, Goods } = this.ctx.model;
    const { lodash } = this.ctx.helper;

    let user = await Order.findOne({
      where: {
        id
      },
      raw:true
    })
    return user
  } 
  async list(search) {
    const { Order, Order_goods, Goods } = this.ctx.model;
    const { lodash } = this.ctx.helper;

    const { page, pageSize } = search
    let offset = (page - 1) * pageSize;
		const { count, rows } = await Order.findAndCountAll({
			where: {},
			offset: offset,
			limit: pageSize,
      raw:true
		});

    return {
      list: rows,
      count: count
    }
  }
  async add(orderInfo) {
    const { Order, Order_goods, Goods } = this.ctx.model;
    const { lodash } = this.ctx.helper;

    let { order_code, customer_name, sale_type, express_fee, pay_status, order_fee, shoesArr } = orderInfo;

    let t = null;
    //事务
    let result = {
      error: {},
      isOK: 0
    }
    try {
        t = await this.ctx.model.transaction();
      
        let newOrder = lodash.pick(orderInfo, ['order_code', 'customer_name', 'sale_type', 'express_fee', 'pay_status', 'order_fee']);
        await Order.create(newOrder, { transaction: t })
    
        let order = await Order.findOne({
          where: {
            order_code: order_code
          },
          raw:true,
          transaction: t
        })

        for( key = 0 ; key < shoesArr.length ; key++ ) {
          let item = shoesArr[key]

          let sunMoney = item.goods_num * item.goods_price;
          await Order_goods.create(
            {
              order_id: order.id,
              goods_id: item.goods_id,
              goods_num: item.goods_num,
              goods_price: item.goods_price,
              goods_fee: sunMoney
            },
            { transaction: t }
          );

          let itemGoods = await Goods.findOne({
            where: {
              id: item.goods_id
            },
            raw:true,
            transaction: t
          })

          let stock = itemGoods.goods_stock - item.goods_num;
          await Goods.update(
            {
              goods_stock: stock,
            },
            {
              //条件
              where: {
                id: item.goods_id
              },
              transaction: t
            }
          )          
        }
        
        await t.commit();

        result.isOK = 1;

      
    } catch (error) {
      console.info(error)
      result = {
        error: error,
        isOK: 0       
      }
      await t.rollback();
    }
    return result
  }
  async update(search) {
    const { Order, Order_goods, Goods } = this.ctx.model;
    const { lodash } = this.ctx.helper;

		let { id, customer_name } = search;

    let isOk = await Order.update(
      {
				customer_name: customer_name,
			},
      {
        //条件
        where: {
					id: id
				},
        raw:true
      }
    )
    return isOk[0]
  }
	async delete(search) {
    const { Order, Order_goods, Goods } = this.ctx.model;
    const { lodash } = this.ctx.helper;

		let { id } = search;
    let t = null;
    //事务
    let result = {
      error: {},
      isOK: 0
    }    

    try{
      t = await this.ctx.model.transaction();

      await Order.destroy({
        where: {
          id: id
        },
        raw:true,
        transaction: t
      });
      let goodsList = await Order_goods.findAll({
        where: {
          order_id: id
        },
        raw:true,
        transaction: t
      }); 
      
      for( key = 0 ; key < goodsList.length ; key++ ) {
        let item = goodsList[key]

        let itemGoods = await Goods.findOne({
          where: {
            id: item.goods_id
          },
          raw:true,
          transaction: t
        })

        let stock = itemGoods.goods_stock + item.goods_num;
        await Goods.update(
          {
            goods_stock: stock,
          },
          {
            //条件
            where: {
              id: item.goods_id
            },
            transaction: t
          }
        )         
      }        

      await Order_goods.destroy({
        where: {
          order_id: id
        },
        raw:true,
        transaction: t
      });
    
      await t.commit();
      result.isOK = 1
    
    } catch (error) {
      console.info(error)
      await t.rollback();
      result = {
        error: error,
        isOK: 0       
      }    
    }


    return result	
	} 
}

module.exports = MenuService;

