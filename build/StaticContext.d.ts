import { ComponentProps } from 'react';
import { StaticRouter } from 'react-router-dom';
/**
 * Объект контекста роутера.
 */
export declare type StaticContext = Exclude<ComponentProps<typeof StaticRouter>['context'], undefined>;
