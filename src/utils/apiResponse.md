when http://localhost:8080/api/chats/65107204b4cba034f1130bff
 //   {
    //     "chat": [
    //         {
    //             "_id": "65245245ba45e8f24de86dd0",
    //             "members": [
    //                 "65107204b4cba034f1130bff",
    //                 "6510772d4013136b01cc3a75"
    //             ],
    //             "createdAt": "2023-10-09T19:19:33.204Z",
    //             "updatedAt": "2023-10-09T19:19:33.204Z",
    //             "__v": 0
    //         },
    //         {
    //             "_id": "65245282ba45e8f24de86df1",
    //             "members": [
    //                 "65107204b4cba034f1130bff",
    //                 "651071a8b4cba034f1130bfc"
    //             ],
    //             "createdAt": "2023-10-09T19:20:34.628Z",
    //             "updatedAt": "2023-10-09T19:20:34.628Z",
    //             "__v": 0
    //         },
    //         {
    //             "_id": "6525bfcb9106472ccad3e1d1",
    //             "members": [
    //                 "65107204b4cba034f1130bff",
    //                 "650fd30fc0499de6e5e34967"
    //             ],
    //             "createdAt": "2023-10-10T21:19:07.367Z",
    //             "updatedAt": "2023-10-10T21:19:07.367Z",
    //             "__v": 0
    //         },
    //         {
    //             "_id": "652b0af29917e0060ad97c6f",
    //             "members": [
    //                 "65107204b4cba034f1130bff",
    //                 "65106db0a8be7fb4ea4be862"
    //             ],
    //             "createdAt": "2023-10-14T21:41:06.354Z",
    //             "updatedAt": "2023-10-14T21:41:06.354Z",
    //             "__v": 0
    //         },
    //         {
    //             "_id": "652b0b359917e0060ad97c83",
    //             "members": [
    //                 "65107204b4cba034f1130bff",
    //                 "65107027b3991ac65416728d"
    //             ],
    //             "createdAt": "2023-10-14T21:42:13.573Z",
    //             "updatedAt": "2023-10-14T21:42:13.573Z",
    //             "__v": 0
    //         }
    //     ],
    //     "status": 200,
    //     "msg": "Here are all your chats..."
    // }



//create msg
  //     {
  //         "chatId":"65114a52b2977a8b0a5e7116", //chatid comes from chat table/model (chat rooms)
  //         "senderId":"65107204b4cba034f1130bff",//userID
  //         "text":"Hello"
  //   }


//when http://localhost:8080/api/message/65245282ba45e8f24de86df1

{
    "msg": "Here are all your messages ...",
    "messages": [
        {
            "_id": "652898604ac0025a4b7ee2db",
            "chatId": "65245282ba45e8f24de86df1",
            "senderId": "65107204b4cba034f1130bff",
            "text": "hi shimmi",
            "createdAt": "2023-10-13T01:07:44.847Z",
            "updatedAt": "2023-10-13T01:07:44.847Z",
            "__v": 0
        },
        {
            "_id": "652898914ac0025a4b7ee2ee",
            "chatId": "65245282ba45e8f24de86df1",
            "senderId": "651071a8b4cba034f1130bfc",
            "text": "hi happy.",
            "createdAt": "2023-10-13T01:08:33.972Z",
            "updatedAt": "2023-10-13T01:08:33.972Z",
            "__v": 0
        },
        {
            "_id": "653226f52c7e44ea4d696978",
            "chatId": "65245282ba45e8f24de86df1",
            "senderId": "651071a8b4cba034f1130bfc",
            "text": "hi",
            "createdAt": "2023-10-20T07:06:29.191Z",
            "updatedAt": "2023-10-20T07:06:29.191Z",
            "__v": 0
        },
        {
            "_id": "653240fc9bf4ad936d0ed1ca",
            "chatId": "65245282ba45e8f24de86df1",
            "senderId": "65107204b4cba034f1130bff",
            "text": "hello shmmi",
            "createdAt": "2023-10-20T08:57:32.807Z",
            "updatedAt": "2023-10-20T08:57:32.807Z",
            "__v": 0
        },
        {
            "_id": "653247ce9bf4ad936d0ed2e1",
            "chatId": "65245282ba45e8f24de86df1",
            "senderId": "651071a8b4cba034f1130bfc",
            "text": "hey",
            "createdAt": "2023-10-20T09:26:38.720Z",
            "updatedAt": "2023-10-20T09:26:38.720Z",
            "__v": 0
        }
    ],
    "status": 200
}