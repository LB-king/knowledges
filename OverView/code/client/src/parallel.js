import axios from '../lib/axios'
import asyncPool from 'asyncpool'
//模拟并行ajax

!(function () {
	function F11() {
		return axios.get('/users')
	}
	function F22() {
		return axios.get('/users/u12')
	}
	function F33() {
		return axios.get('/users/u2')
	}
	const delay = function (inteval) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(inteval)
			}, inteval)
		})
	}
	let tasks = [
		() => delay(1000),
		() => delay(1002),
		() => delay(1001),
		() => delay(1003),
		() => delay(1004),
		() => delay(1006)
	]

	btn7.addEventListener('click', () => {
		let apiTasks = [F11, F22, F33, F11, F22, F33]
		/*  Promise.all([F11(), F22(), F33()])
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      }) */
		//无并发限制
		/*  Promise.all(tasks.map((task) => task())).then((results) => {
      console.log(results)
    }) */
		/* 
      asyncPool:
        + 第一个参数: 并发任务数
        + 第二个参数: 目标数组
        + 第三个参数: 回调函数
        + 第四个参数: 全部执行结束的回调
       */
		/* let results = []
    asyncPool(
      2,
      apiTasks,
      (task, next) => {
        task().then((result) => {
          results.push(result)
          next()
        })
      },
      () => {
        console.log(results)
      }
    ) */

		/*
		 *JS实现Ajax并发请求控制的2大方案,在程序中限制
		 */
		/* 
  1.tasks数组，数组包含很多方法，每一个方法执行就是发送一个请求「基于Promise管理」
  */
		/* function createRequest(tasks, pool) {
      pool = pool || 5
      let results = [],
        together = new Array(pool).fill(null),
        index = 0, //任务的index
        isError = false
      together = together.map(() => {
        return new Promise((resolve, reject) => {
          let run = function run() {
            //双重判断，只要错误就终止
            if (index >= tasks.length || isError) {
              resolve()
              return
            }
            let pre_index = index,
              task = tasks[index++]
            task()
              .then((result) => {
                results[pre_index] = result
                run()
              })
              .catch((reason) => {
                isError = true
                reject(reason)
              })
          }
          run()
        })
      })
      return Promise.all(together)
        .then(() => results)
    }

    createRequest(apiTasks, 2)
      .then((results) => {
        //全部成功才算成功
        console.log('成功', results)
      })
      .catch((reason) => {
        //有一个失败即失败
        console.log('失败', reason)
        
      }) */

		/* 
      2.成功几个存几个
      */

		function createRequest(tasks, pool, callback) {
			// 1.不传pool，传了回调函数
			if (typeof pool !== 'function') {
				callback = pool
				pool = 5
			}
			// 2.第二个参数不是数字，则pool为5
			if (typeof pool !== 'number') pool = 5
			// 3.不传回调函数
			if (typeof pool !== 'function') callback = function () {}

			/* 
        补量执行，没时间片就挂起，有时间片就调用
      */

			class TaskQueue {
				// 正在执行的任务
				running = 0
				queue = []
				results = []

				pushTask(task) {
					let self = this
					self.queue.push(task)
					self.next()
				}
				next() {
					let self = this
					while (self.running < pool && self.queue.length > 0) {
						self.running++
						let task = self.queue.shift()
						task()
							.then(res => {
								self.results.push(res)
							})
							.finally(() => {
								self.running--
								self.next()
							})
					}
					if (self.running === 0) callback(self.results)
				}
			}
			let tq = new TaskQueue()
			tasks.forEach(task => tq.pushTask(task))
		}
		createRequest(apiTasks, 2, res => {
			console.log(res)
		})
	})
})()
