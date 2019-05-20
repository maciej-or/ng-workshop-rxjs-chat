import { Observable } from 'rxjs';
import { Message } from '../model/message-model';
import { map } from 'rxjs/operators';

// full version
// export const emoji = () => (source: Observable<Message>) =>
//   new Observable(observer => {
//     return source.subscribe({
//       next(m) {
//         m.text = m.text.replace(':)', '😀');
//         observer.next(m);
//       },
//       error(err) { observer.error(err); },
//       complete() { observer.complete(); }
//     });
//   });

// compact version using existing operator `map`
export const emoji = () => map((m: Message) => {
  m.text = m.text.replace(':)', '😀');
  return m;
});
