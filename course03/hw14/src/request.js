const noop = () => {};

function request({
   method = 'GET',
   url,
   type = 'json',
   checkStatusInResponse = false,
   onSuccess = noop,
   onError = noop,
}) {
   const req = new XMLHttpRequest();

   req.open(method, url);
   req.responseType = type;

   req.addEventListener('load', (event) => {
      const target = event.target;

      if (target.status !== 200) {
         onError(target.statusText);

         return;
      }

      if (checkStatusInResponse && target.response.status !== 'ok') {
         onError(target.statusText);

         return;
      }

      onSuccess(target.response);
   });

   req.onerror = function () {
      onError();
   };

   req.send();
}
