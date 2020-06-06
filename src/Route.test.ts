import { createElement, ReactNode } from 'react';
import { StaticRouter, Switch } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { assert } from 'chai';

import { UndefinedComponentError } from './UndefinedComponentError';
import { UndefinedPathError } from './UndefinedPathError';
import { Route } from './Route';

describe('Route', () => {
  describe('getPath', () => {
    class TestRoute extends Route {
      public getTestPath() {
        return this.getPath();
      }
    }

    class ValidTestRoute extends TestRoute {
      public path = '/';
    }

    class InvalidTestRoute extends TestRoute {}

    it('should works well if path is defined', () => {
      assert.doesNotThrow(() => ValidTestRoute.get().getTestPath());
    });

    it('should throws an error if the path is undefined', () => {
      assert.throw(
        () => InvalidTestRoute.get().getTestPath(),
        new UndefinedPathError(InvalidTestRoute.name).message
      );
    });
  });

  describe('getComponent', () => {
    class TestRoute extends Route {
      public getTestComponent() {
        return this.getComponent();
      }
    }

    const Component = () => null;

    class ValidTestRoute extends TestRoute {
      public component = Component;
    }

    class InvalidTestRoute extends TestRoute {}

    it('should works well if the component is defined', () => {
      assert.doesNotThrow(() => ValidTestRoute.get().getTestComponent());
    });

    it('should throws an error if the component is undefined', () => {
      assert.throw(
        () => InvalidTestRoute.get().getTestComponent(),
        new UndefinedComponentError(InvalidTestRoute.name).message
      );
    });
  });

  describe('href', () => {
    class EmptyRoute extends Route {
      public path = '/';
    }

    type StringParams = {
      foo: string;
    };

    class StringRoute extends Route<StringParams> {
      public path = '/:foo';
    }

    type NumberParams = {
      foo: number;
    };

    class NumberRoute extends Route<NumberParams> {
      public path = '/:foo';
    }

    it('should works without parameters', () => {
      const value = EmptyRoute.get().href();
      assert.equal(value, '/');
    });

    it('should works with string parameter', () => {
      const foo = 'bar';
      const value = StringRoute.get().href({ foo });
      assert.equal(value, `/${foo}`);
    });

    it('should works with number parameter', () => {
      const foo = 1;
      const value = NumberRoute.get().href({ foo });
      assert.equal(value, `/${foo}`);
    });
  });

  describe('render', () => {
    it('should works and result component renders well', () => {
      const text = 'Hello world!';

      const Component = () => createElement('div', {}, text);

      class CustomRoute extends Route {
        public component = Component;
        public path = '/';
      }

      const value = renderToString(
        createElement(StaticRouter, {}, CustomRoute.get().render())
      );

      assert.equal(value, `<div>${text}</div>`);
    });
  });

  describe('redirect', () => {
    const getUrl = (path: string, node: ReactNode): string | undefined => {
      const context: any = {};

      renderToString(
        createElement(
          StaticRouter,
          { context, location: path },
          createElement(Switch, {}, node)
        )
      );

      const { url } = context;
      return url;
    };

    it('should works without options', () => {
      const redirectUrl = '/foo';

      class CustomRoute extends Route {
        public path = redirectUrl;
      }

      const url = getUrl('/', CustomRoute.get().redirect());
      assert.equal(url, redirectUrl);
    });

    it('should works with parametrized path and without options', () => {
      const redirectUrl = '/bar';

      type Params = {
        foo: string;
      };

      class CustomRoute extends Route<Params> {
        public path = '/:foo';
      }

      const url = getUrl('/', CustomRoute.get().redirect({ foo: 'bar' }));
      assert.equal(url, redirectUrl);
    });

    it('should redirects if the option "from" is string and matches to location', () => {
      const redirectUrl = '/bar';
      const location = '/foo';

      class CustomRoute extends Route {
        public path = redirectUrl;
      }

      const url = getUrl(
        location,
        CustomRoute.get().redirect(undefined, {
          from: location,
        })
      );

      assert.equal(url, redirectUrl);
    });

    it("should not redirects if the option doesn't match to location", () => {
      const redirectUrl = '/bar';
      const location = '/';

      class CustomRoute extends Route {
        public path = redirectUrl;
      }

      const url = getUrl(
        location,
        CustomRoute.get().redirect(undefined, { from: '/xyz' })
      );

      assert.isUndefined(url);
    });

    it("should redirects if parent of the page is match with 'from' and 'exact' is undefined", () => {
      const redirectUrl = '/foo';
      const location = '/bar';

      class CustomRoute extends Route {
        public path = redirectUrl;
      }

      const url = getUrl(
        location,
        CustomRoute.get().redirect(undefined, { from: '/' })
      );

      assert.equal(url, redirectUrl);
    });

    it("should not redirects if parent of the page is match with 'from' and 'exact' is true", () => {
      const redirectUrl = '/foo';
      const location = '/bar';

      class CustomRoute extends Route {
        public path = redirectUrl;
      }

      const url = getUrl(
        location,
        CustomRoute.get().redirect(undefined, { exact: true, from: '/' })
      );

      assert.isUndefined(url);
    });

    it("should redirects if 'from' is Route instance", () => {
      const from = '/foo';
      const to = '/bar';

      class FromRoute extends Route {
        public path = from;
      }

      class ToRoute extends Route {
        public path = to;
      }

      const url = getUrl(
        from,
        ToRoute.get().redirect(undefined, { from: FromRoute.get() })
      );

      assert.equal(url, to);
    });

    it("shouldn't redirects a nested url if 'from' is Route instance with true 'exact'", () => {
      const from = '/foo';
      const to = '/bar';

      class FromRoute extends Route {
        public exact = true;
        public path = from;
      }

      class ToRoute extends Route {
        public path = to;
      }

      const url = getUrl(
        `${from}/bar`,
        ToRoute.get().redirect(undefined, { from: FromRoute.get() })
      );

      assert.isUndefined(url);
    });

    it("should redirects a nested url if 'from' is Route instance with overriden in options 'exact'", () => {
      const from = '/foo';
      const to = '/bar';

      class FromRoute extends Route {
        public exact = true;
        public path = from;
      }

      class ToRoute extends Route {
        public path = to;
      }

      const url = getUrl(
        `${from}/bar`,
        ToRoute.get().redirect(undefined, {
          from: FromRoute.get(),
          exact: false,
        })
      );

      assert.equal(url, to);
    });
  });
});
