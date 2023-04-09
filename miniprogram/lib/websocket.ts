export async function useWebsocket(data: any) {
  //const socketTask = wx.connectSocket({
		//url: "ws://192.168.0.103:9000/",
	//});
	wx.cloud.init({
		traceUser: true
	})	
	const { socketTask } = 
	//wx.connectSocket({
	//   url: "wss://aisearch4-prod-0gwxqebb290dca3c-1253819465.ap-shanghai.run.wxcloudrun.com/",
	// });
	await wx.cloud.connectContainer({
		"config": {
			"env": "prod-0gwxqebb290dca3c"
		},
		"service": "aisearch4",
		"path": "/"
	})
	console.log(socketTask)
  return {
    send: () => {
      socketTask.onOpen(() => socketTask.send({ data: JSON.stringify(data) }));
    },

    handleMessage: (handler: Function) => {
      socketTask.onMessage((res) => handler(res.data as string));
    },

    handleClose: (handler: Function) => {
      socketTask.onClose((res) => handler(res));
    },

	};
}
