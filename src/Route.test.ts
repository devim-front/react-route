import { createElement } from 'react';
import { StaticRouter } from 'react-router-dom';
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
    it('should works without parameters', () => {
      const base = '/foo';

      class TestRoute extends Route {
        public path = base;
      }

      const value = TestRoute.get().href();
      assert.equal(value, base);
    });

    it('should works with one parameter', () => {
      const base = '/foo';
      const bar = 'bar';

      type Params = { bar: string };

      class TestRoute extends Route<Params> {
        public path = `${base}/:${bar}`;
      }

      const value = TestRoute.get().href({ bar });
      assert.equal(value, `${base}/${bar}`);
    });

    it('should works with many parameters', () => {
      const base = '/foo';
      const bar = 'bar';
      const xyz = 'xyz';

      type Params = { bar: string; xyz: string };

      class TestRoute extends Route<Params> {
        public path = `${base}/:${bar}/:${xyz}`;
      }

      const value = TestRoute.get().href({ bar, xyz });
      assert.equal(value, `${base}/${bar}/${xyz}`);
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
    it('should works without parameters', () => {
      const base = '/foo';

      class TestRoute extends Route {
        public path = base;
      }

      const value = TestRoute.get().redirect();

      assert.ownInclude(value.props, {
        push: true,
        to: base,
        from: undefined,
        exact: undefined,
      });
    });

    it('should works with parameters', () => {
      const base = '/foo';
      const bar = 'bar';

      type Params = { bar: string };

      class TestRoute extends Route<Params> {
        public path = `${base}/:${bar}`;
      }

      const value = TestRoute.get().redirect({ bar });

      assert.ownInclude(value.props, {
        push: true,
        to: `${base}/${bar}`,
        from: undefined,
        exact: undefined,
      });
    });

    it('should works with "from" argument as string', () => {
      const base = '/foo';
      const from = '/bar';

      class TestRoute extends Route {
        public path = base;
      }

      const value = TestRoute.get().redirect(from);

      assert.ownInclude(value.props, {
        push: true,
        to: base,
        exact: undefined,
        from,
      });
    });

    it('should works with "from" argument as string and parameters', () => {
      const base = '/foo';
      const from = '/bar';
      const bar = 'bar';

      type Params = { bar: string };

      class TestRoute extends Route<Params> {
        public path = `${base}/:${bar}`;
      }

      const value = TestRoute.get().redirect(from, { bar });

      assert.ownInclude(value.props, {
        to: `${base}/${bar}`,
        push: true,
        exact: undefined,
        from,
      });
    });

    it('should works with "from" argument as string and "exact" flag', () => {
      const base = '/foo';
      const from = '/bar';

      class TestRoute extends Route {
        public path = base;
      }

      const value = TestRoute.get().redirect(from, true);

      assert.ownInclude(value.props, {
        push: true,
        to: base,
        exact: true,
        from,
      });
    });

    it('should works with "from" argument as string, "exact" flag and parameters', () => {
      const exact = true;
      const base = '/foo';
      const from = '/bar';
      const bar = 'bar';

      type Params = { bar: string };

      class TestRoute extends Route<Params> {
        public path = `${base}/:${bar}`;
      }

      const value = TestRoute.get().redirect(from, exact, { bar });

      assert.ownInclude(value.props, {
        to: `${base}/${bar}`,
        push: true,
        exact,
        from,
      });
    });

    it('should works with "from" argument as Route', () => {
      class FromRoute extends Route {
        public path = '/bar';
      }

      const base = '/foo';
      const from = FromRoute.get();

      class TestRoute extends Route {
        public path = base;
      }

      const value = TestRoute.get().redirect(from);

      assert.ownInclude(value.props, {
        push: true,
        to: base,
        exact: FromRoute.get().exact,
        from: FromRoute.get().path,
      });
    });

    it('should works with "from" argument as Route and parameters', () => {
      class FromRoute extends Route {
        public path = '/bar';
      }

      const base = '/foo';
      const bar = 'bar';
      const from = FromRoute.get();

      type Params = { bar: string };

      class TestRoute extends Route<Params> {
        public path = `${base}/:${bar}`;
      }

      const value = TestRoute.get().redirect(from, { bar });

      assert.ownInclude(value.props, {
        push: true,
        to: `${base}/${bar}`,
        exact: FromRoute.get().exact,
        from: FromRoute.get().path,
      });
    });

    it('should works with "from" argument as Route and "exact" flag', () => {
      class FromRoute extends Route {
        public path = '/bar';
      }

      const exact = true;
      const base = '/foo';
      const from = FromRoute.get();

      class TestRoute extends Route {
        public path = base;
      }

      const value = TestRoute.get().redirect(from, exact);

      assert.ownInclude(value.props, {
        push: true,
        to: base,
        from: FromRoute.get().path,
        exact,
      });
    });

    it('should works with "from" argument as Route, "exact" flag and parameters', () => {
      class FromRoute extends Route {
        public path = '/bar';
      }

      const exact = true;
      const base = '/foo';
      const bar = 'bar';
      const from = FromRoute.get();

      type Params = { bar: string };

      class TestRoute extends Route<Params> {
        public path = `${base}/:${bar}`;
      }

      const value = TestRoute.get().redirect(from, exact, { bar });

      assert.ownInclude(value.props, {
        push: true,
        to: `${base}/${bar}`,
        from: FromRoute.get().path,
        exact,
      });
    });
  });

  describe('replace', () => {
    it('should works without parameters', () => {
      const base = '/foo';

      class TestRoute extends Route {
        public path = base;
      }

      const value = TestRoute.get().replace();

      assert.ownInclude(value.props, {
        push: false,
        to: base,
        from: undefined,
        exact: undefined,
      });
    });

    it('should works with parameters', () => {
      const base = '/foo';
      const bar = 'bar';

      type Params = { bar: string };

      class TestRoute extends Route<Params> {
        public path = `${base}/:${bar}`;
      }

      const value = TestRoute.get().replace({ bar });

      assert.ownInclude(value.props, {
        push: false,
        to: `${base}/${bar}`,
        from: undefined,
        exact: undefined,
      });
    });

    it('should works with "from" argument as string', () => {
      const base = '/foo';
      const from = '/bar';

      class TestRoute extends Route {
        public path = base;
      }

      const value = TestRoute.get().replace(from);

      assert.ownInclude(value.props, {
        push: false,
        to: base,
        exact: undefined,
        from,
      });
    });

    it('should works with "from" argument as string and parameters', () => {
      const base = '/foo';
      const from = '/bar';
      const bar = 'bar';

      type Params = { bar: string };

      class TestRoute extends Route<Params> {
        public path = `${base}/:${bar}`;
      }

      const value = TestRoute.get().replace(from, { bar });

      assert.ownInclude(value.props, {
        to: `${base}/${bar}`,
        push: false,
        exact: undefined,
        from,
      });
    });

    it('should works with "from" argument as string and "exact" flag', () => {
      const base = '/foo';
      const from = '/bar';

      class TestRoute extends Route {
        public path = base;
      }

      const value = TestRoute.get().replace(from, true);

      assert.ownInclude(value.props, {
        push: false,
        to: base,
        exact: true,
        from,
      });
    });

    it('should works with "from" argument as string, "exact" flag and parameters', () => {
      const exact = true;
      const base = '/foo';
      const from = '/bar';
      const bar = 'bar';

      type Params = { bar: string };

      class TestRoute extends Route<Params> {
        public path = `${base}/:${bar}`;
      }

      const value = TestRoute.get().replace(from, exact, { bar });

      assert.ownInclude(value.props, {
        to: `${base}/${bar}`,
        push: false,
        exact,
        from,
      });
    });

    it('should works with "from" argument as Route', () => {
      class FromRoute extends Route {
        public path = '/bar';
      }

      const base = '/foo';
      const from = FromRoute.get();

      class TestRoute extends Route {
        public path = base;
      }

      const value = TestRoute.get().replace(from);

      assert.ownInclude(value.props, {
        push: false,
        to: base,
        exact: FromRoute.get().exact,
        from: FromRoute.get().path,
      });
    });

    it('should works with "from" argument as Route and parameters', () => {
      class FromRoute extends Route {
        public path = '/bar';
      }

      const base = '/foo';
      const bar = 'bar';
      const from = FromRoute.get();

      type Params = { bar: string };

      class TestRoute extends Route<Params> {
        public path = `${base}/:${bar}`;
      }

      const value = TestRoute.get().replace(from, { bar });

      assert.ownInclude(value.props, {
        push: false,
        to: `${base}/${bar}`,
        exact: FromRoute.get().exact,
        from: FromRoute.get().path,
      });
    });

    it('should works with "from" argument as Route and "exact" flag', () => {
      class FromRoute extends Route {
        public path = '/bar';
      }

      const exact = true;
      const base = '/foo';
      const from = FromRoute.get();

      class TestRoute extends Route {
        public path = base;
      }

      const value = TestRoute.get().replace(from, exact);

      assert.ownInclude(value.props, {
        push: false,
        to: base,
        from: FromRoute.get().path,
        exact,
      });
    });

    it('should works with "from" argument as Route, "exact" flag and parameters', () => {
      class FromRoute extends Route {
        public path = '/bar';
      }

      const exact = true;
      const base = '/foo';
      const bar = 'bar';
      const from = FromRoute.get();

      type Params = { bar: string };

      class TestRoute extends Route<Params> {
        public path = `${base}/:${bar}`;
      }

      const value = TestRoute.get().replace(from, exact, { bar });

      assert.ownInclude(value.props, {
        push: false,
        to: `${base}/${bar}`,
        from: FromRoute.get().path,
        exact,
      });
    });
  });
});
