/*
 *   Родительский класс для всех виджетов
 *   содержит конструктор с проверкой приходящего узла
 *   на принадлежность его к HTML элементам
 */

class Widget {
   constructor(node) {
      if (!(element instanceof HTMLElement)) {
         throw new Error('Передан не HTML элемент');
      }

      this.node = node;
   }
}
