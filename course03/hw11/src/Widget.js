/*
 *   Родительский класс для всех виджетов
 *   содержит конструктор с проверкой приходящего узла
 *   на принадлежность его к HTML элементам
 */

class Widget {
   checkNode(node) {
      if (!(node instanceof HTMLElement)) {
         throw new Error('Передан не HTML элемент');
      }
   }
}
