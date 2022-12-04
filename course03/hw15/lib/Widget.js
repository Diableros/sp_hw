/*
 *   Родительский класс для всех виджетов
 *   Будет содержать методы общие для разных виджетов
 */

class Widget {
   static checkNode(node) {
      if (!(node instanceof HTMLElement)) {
         throw new Error('Передан не HTML элемент');
      }
   }
}
