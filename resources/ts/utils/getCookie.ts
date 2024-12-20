export function getCookie(name:string){
    const myCookie = name + "=";
    const cookies = document.cookie.split(';');
    for(let i = 0; i <cookies.length; i++) {
        let c = cookies[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(myCookie) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
}

