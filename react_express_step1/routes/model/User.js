//User 관련된 DB 처리
const pool = require("./pool");
const mysql = require("mysql");
const moment = require('moment');
// const Promise = require('bluebird');
const util = require('util');


const now = moment().format("YYYYMMDD");

// register
exports.register = util.promisify(function(param, cb) {
//   var password = param.upw;
  pool.acquire((err, conn) => {
    if (err) {
      cb(err, []);
    } else {
      sql =
        "INSERT INTO USER_INFO (user_id, password, user_nm, gender, insert_date, insert_by, valid_dt) VALUES (?,?,?,?,?,?,'99991231');";
      conn.query(
        sql,
        [param.uid, param.upw, param.uname, param.gender, now],
        (err1, rows) => {
          pool.release(conn);
          cb(err1, rows);
          console.log("err1" + err1);
        }
      );
    }
  });
});

exports.findId = util.promisify(function( param, cb )
{
	pool.acquire(function( err, conn ){
		if( err ){
			cb( err, [] );
		}else{
			console.log('findId: '+param.uid);
			sql = "select user_id uid from USER_INFO where user_id=?;";
			conn.query(sql, [param.uid], function(err1, rows){
				pool.release( conn );
				cb( err1, rows );
			});
		}
	});

});


exports.findOne = util.promisify(function( param, cb )
{
	pool.acquire(( err, conn ) => {
		if( err ){
			cb( err, [] );
		}else{
            console.log('findOne: '+JSON.stringify(param));
			sql = "select user_id uid, password upw,user_nm uname, jener from USER_INFO where user_id=?;";
			conn.query(sql, [param.uid], (err1, rows) => {
				pool.release( conn );
				cb( err1, rows );
			});
		}
	});
});