import { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
/**
 * Свойства компонента.
 */
declare type Props = RouteComponentProps;
declare const component: import("react").ComponentClass<Pick<Props, never>, any> & import("react-router").WithRouterStatics<FC<Props>>;
export { component as RouterScope };
