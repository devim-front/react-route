import { ComponentProps } from 'react';
import { StaticRouter } from 'react-router-dom';

/**
 * Объект контекста роутера.
 */
export type StaticContext = Exclude<
  ComponentProps<typeof StaticRouter>['context'],
  undefined
>;
