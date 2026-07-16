 /**
  * @param t {number} длительность задержки
  * @param cb {undefined | () => void} опциональный коллбек, выполняется после ожидания 
  * @description выждать заданый временный отрезок, при необходимости затем выполнить коллбек
  * */
 export async function sleep(t: number, cb?: () => void) {
  return await new Promise(resolve => {
    const delay = setTimeout(() => {
      clearTimeout(delay);
      cb?.();
      resolve(true);
    }, t);
  }); 
}
