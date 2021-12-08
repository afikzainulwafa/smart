function postData(url, data, bearer_token='None') {
    var bearer = 'Bearer ' + bearer_token;
    return fetch(url, {
        body: JSON.stringify(data), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
            'Authorization': bearer,          
            'user-agent': 'Example',
            'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
    })
        .then(response => response.json()) // 輸出成 json
}

function getData(url,  bearer_token) {
  var bearer = 'Bearer ' + bearer_token;
  return fetch(url, {
      headers: {
          'Authorization': bearer,
          'user-agent': 'Example',
          'content-type': 'application/json',
          'cache-Control': 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          'Accept':'*/*',
          'Connection':'keep-alive'
      },
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
  })
      .then(response => response.json()) // 輸出成 json
}

/*
  Function
*/

/*
  API
*/
async function loginJWT(){
    //const VAR_USR = 'tcust01';
    //const VAR_PWD = 'smartc0';
    const VAR_USR = document.getElementById('VarUsr').value;
    const VAR_PWD = document.getElementById('VarPwd').value;
    const post_data ={
        "userName":VAR_USR,
        "passWord":VAR_PWD
    }

    let data = await postData('http://34.80.124.67:3000/gologin',post_data)

    console.log(data)

    const ret_access_token = data.access_token;
    const ret_refresh_token = data.refresh_token;
    const ret_login = data.login;
    //將sum_val的值，放到id='SumText'的地方
    document.getElementById('RspLogin').innerHTML = ret_login;
    document.getElementById('RspAccessToken').innerHTML = ret_access_token;
    document.getElementById('RspRefreshToken').innerHTML = ret_refresh_token;
    //儲存user, access_toeken, refresh_toeken到localStorage
    localStorage.setItem('jwt_usr', VAR_USR)
    localStorage.setItem('jwt_access_token', ret_access_token)
    localStorage.setItem('jwt_refresh_token', ret_refresh_token)
    //除錯用途，回讀localStorage的資料並顯示
    /*
    const local_jwt_usr = localStorage.getItem('jwt_usr');
    const local_jwt_access_token = localStorage.getItem('jwt_access_token');
    console.log('usr -> ' + local_jwt_usr);
    console.log('access token -> ' + local_jwt_access_token);
    */
}


async function RefreshToeken(){
  const bearer_token = localStorage.getItem('jwt_refresh_token')
  post_data={}
  let data = await postData('http://34.80.124.67:3000/gorfh', post_data, bearer_token)

      console.log(data)
      const ret_access_token = data.access_token;
      //將sum_val的值，放到id='SumText'的地方
      document.getElementById('RspNewToken').innerHTML = ret_access_token;
      //setCookie(data)
      localStorage.setItem('jwt_access_token', ret_access_token)

}

async function loginChk(){

  const post_data = localStorage.getItem('jwt_access_token')

  let data = await getData('http://34.80.124.67:3000/gochk', post_data)
  console.log(data)
  if (data.msg=='Token has expired'){
    alert('Token has expired')
  }
}

function proc_logout(){

  localStorage.setItem('jwt_usr', "NULL")
  localStorage.setItem('jwt_access_token', "NULL")
  localStorage.setItem('jwt_refresh_token', "NULL")

  console.log('you are logout')
  window.location.assign("login.html");

}

async function getSdval(){
  const local_jwt_usr = localStorage.getItem('jwt_usr')
  const local_jwt_access_token = localStorage.getItem('jwt_access_token')

  const post_data={
    'usr':local_jwt_usr
  }

  let data = await postData('http://34.80.124.67:3000/gosens', post_data, local_jwt_access_token)
  //.then(data=>{
    console.log(data)

    if (data.msg=='Token has expired'){
      console.log('oh, Token has expired')
      window.location.assign("login.html");
    } else {  
    
      //分析收到的 data

    } //Token has expired
  //})
}

//setInterval(postData,1000);
