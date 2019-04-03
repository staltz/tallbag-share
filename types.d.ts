import {Source} from 'tallbag';
import {Metadata} from 'shadow-callbag';

export default function share<T extends Source<any, Metadata>>(source: T): T;
