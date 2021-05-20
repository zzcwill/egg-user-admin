'use strict';

const Service = require('egg').Service;
const sha1 = require('sha1');
const xml2js = require('xml2js');
const parser = new xml2js.Parser({ trim: true, explicitArray: false, explicitRoot: false });
const builder = new xml2js.Builder({ headless: true, cdata: true, explicitRoot: false, rootName: 'xml' });


class UserService extends Service {
  async getUserByUsername(username) {
    const { User } = this.ctx.model;

    let user = await User.findOne({
      where: {
        username
      },
      raw: true
    })
    return user
  }
  async createUser(user) {
    const { User } = this.ctx.model;
    let newUser = await User.create(user)
    return newUser
  }
  async changePassword(password, uid) {
    const { User } = this.ctx.model;
    let isOk = await User.update(
      password,
      {
        //条件
        where: uid
      }
    )
    return isOk[0]
  }
  async getUserByOpenid(openid) {
    const { User } = this.ctx.model;
    let user = await User.findOne({
      where: {
        openid
      },
      raw: true
    })
    return user
  }
  async updateOpenid(id, openid) {
    const { User } = this.ctx.model;

    let isOk = await User.update(
      {
        openid: openid,
      },
      {
        //条件
        where: {
          id: id
        },
        raw: true
      }
    )
    return isOk[0]
  }

  async authWechatMsg(query) {
    let { signature, echostr, timestamp, nonce } = query;

    const token = 'token'; // 这个地方就是公众平台上所谓的token 必须一样

    // 将token、timestamp、nonce三个参数进行字典序排序
    const arr = [token, timestamp, nonce];
    arr.sort();

    const str = arrSort.join('');
    const shaStr = sha1(str);

    if (shaStr !== signature) {
      return false;
    }

    if (shaStr === signature) {
      return echostr
    }
  }
  async wechatMsg(msgbufer) {
    let toData = {
      error: '',
      // 默认数据返回为空，不能微信会重推3次
      data: ''
    }
    return new Promise((resolve, reject) => {
      parser.parseString(msgbufer.toString(), async function (err, result) {
        console.info(result)
        if (err) {
          toData.error = err
          resolve(toData);
        }
        var baseData = {
          ToUserName: result.FromUserName,
          FromUserName: result.ToUserName,
          CreateTime: Date.now(),
        }

        switch (result.MsgType) {
          case 'text':
            switch (result.Content.toLowerCase()) {
              case 'test':
                // 返回帮助内容
                var helpTxt = [
                  '1 test1',
                  '2 test2'
                ]
                var data = Object.assign({
                  MsgType: 'text',
                  Content: helpTxt.join('\n'),
                }, baseData);

                toData.data = builder.buildObject(data);

                resolve(toData);
                break;
              default:
                resolve(toData);
                break;
            }
            break;
          case 'event':
            if (result.Event === 'subscribe') {
              // 关注
              var data = Object.assign({
                MsgType: 'news',
                ArticleCount: 1,
                Articles: {
                  item: {
                    Title: 'test',
                    Description: 'test',
                    PicUrl: 'http://47.110.42.110:3301/static/img/1.29a2929d.jpg',
                    Url: 'http://zzc.cdreamy.cn/bindok',
                  },
                },
              }, baseData);

              toData.data = builder.buildObject(data);

              resolve(toData);
            } else if (result.Event === 'unsubscribe') {
              // 取消关注
              var data = Object.assign({
                MsgType: 'text',
                Content: '在下没能满足客官的需求，实在抱歉~~',
              }, baseData);

              toData.data = builder.buildObject(data);

              resolve(toData);
            }
            resolve(toData);
            break;
          default:
            resolve(toData);
            break;
        }
      });
    });

  }
}

module.exports = UserService;