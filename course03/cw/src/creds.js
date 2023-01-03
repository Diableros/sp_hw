class Creds {
   checkUser = () => {
      return Boolean(JSON.parse(localStorage.getItem('rspCreds'))?.login);
   };

   set(credsObj) {
      const curCreds = JSON.parse(localStorage.getItem('rspCreds')) || {};

      for (let prop in credsObj) curCreds[prop] = credsObj[prop];

      return localStorage.setItem('rspCreds', JSON.stringify(curCreds));
   }

   get(field = false) {
      const data = JSON.parse(localStorage.getItem('rspCreds'));
      if (!field) return data;

      return data[field];
   }
}
