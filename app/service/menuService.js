'use strict';

const Service = require('egg').Service;

class MenuService extends Service {
  async menu(search) {
    const { Menu } = this.ctx.model;

    let { page, pageSize } = search;
    let offset = (page - 1) * pageSize;
		const { count, rows } = await Menu.findAndCountAll({
			where: {},
			offset: offset,
			limit: pageSize,
      raw:true
		});

    let treeMenu = getTreeMenu(rows)

    return {
      list: treeMenu,
      count: treeMenu.length
    }    
  }
  async userMenu(search) {
    const { Menu } = this.ctx.model;

    const { uid, page, pageSize } = search;
    let offset = (page - 1) * pageSize;

		let userRoleList = await sequelize.query(
      `
        SELECT e.* 
        FROM 
        user a 
        INNER JOIN user_role  b  on  a.uid = b.user_id 
        INNER JOIN role  c  on  b.role_id = c.id
        INNER JOIN role_menu d  on  c.id = d.role_id
        INNER JOIN menu e  on  d.menu_id = e.id        
        WHERE a.uid = ?
        LIMIT ?
        OFFSET ?;`,
      {
        replacements: [uid, pageSize, offset],
        type: QueryTypes.SELECT,
        raw: true
      }
    );

    let treeMenu = getTreeMenu(userRoleList)

    return {
      list: treeMenu,
      count: treeMenu.length
    }
  }
}

module.exports = MenuService;
