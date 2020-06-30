import { createElement, FC } from 'react';
import { Switch } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { assert } from 'chai';

import { UndefinedComponentError } from './UndefinedComponentError';
import { UndefinedPathError } from './UndefinedPathError';
import { Route } from './Route';
import { NoMatchesError } from './NoMatchesError';
import { Router } from './Router';

describe('Route', () => {
  const render = (href: string, route: any) =>
    renderToString(
      createElement(
        Router,
        { url: href },
        createElement(Switch, {}, route.get().render())
      )
    );

  describe('href', () => {
    it('should throws an error if "path" property is undefined', () => {
      class TestRoute extends Route {}

      assert.throws(
        () => TestRoute.get().href(),
        new UndefinedPathError(TestRoute.name).message
      );
    });

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
    it('should throws an error if the "component" property is undefined', () => {
      class TestRoute extends Route {
        public path = '/foo';
      }

      assert.throws(
        () => TestRoute.get().render(),
        new UndefinedComponentError(TestRoute.name).message
      );
    });

    it('should works and result component renders well', () => {
      const text = 'Hello world!';

      const Component = () => createElement('div', {}, text);

      class CustomRoute extends Route {
        public component = Component;
        public path = '/';
      }

      const value = render('/', CustomRoute);

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

  describe('isMatch', () => {
    it("should returns false if the href doesn't matches with route without parameters", () => {
      class TestRoute extends Route {
        public path = '/foo';
      }

      const value = TestRoute.get().isMatch('/bar');
      assert.isFalse(value);
    });

    it('should returns true if the href matches with route without parameters', () => {
      class TestRoute extends Route {
        public path = '/foo';
      }

      const value = TestRoute.get().isMatch('/foo');
      assert.isTrue(value);
    });

    it('should returns false if the href matches with route but the "exact" flag is turned on', () => {
      class TestRoute extends Route {
        public path = '/foo';
        public exact = true;
      }

      const value = TestRoute.get().isMatch('/foo/bar');
      assert.isFalse(value);
    });

    it('should returns true if the href matches with route with parameters', () => {
      type Params = { bar: string };

      class TestRoute extends Route<Params> {
        public path = '/foo/:bar';
      }

      const value = TestRoute.get().isMatch('/foo/bar');
      assert.isTrue(value);
    });

    it("should returns false if the href doesn't match with route with parameters", () => {
      type Params = { bar: string };

      class TestRoute extends Route<Params> {
        public path = '/foo/:bar(\\d+)';
      }

      const value = TestRoute.get().isMatch('/foo/bar');
      assert.isFalse(value);
    });

    it("should throws an error if the path doesn't specified", () => {
      class TestRoute extends Route {}

      assert.throws(
        () => TestRoute.get().isMatch('/foo'),
        new UndefinedPathError(TestRoute.name).message
      );
    });
  });

  describe('parse', () => {
    it("should returns undefined if route hasn't parameters", () => {
      class TestRoute extends Route {
        public path = '/foo';
      }

      const value = TestRoute.get().parse('/foo');
      assert.isUndefined(value);
    });

    it('should returns an object if route has a parameters', () => {
      type Params = { bar: string };

      class TestRoute extends Route<Params> {
        public path = '/foo/:bar';
      }

      const value = TestRoute.get().parse('/foo/bar');
      assert.ownInclude(value, { bar: 'bar' });
    });

    it("should throws an error if the href doesn't matches with route", () => {
      class TestRoute extends Route {
        public path = '/foo/:bar';
      }

      assert.throws(
        () => TestRoute.get().parse('/bar/foo'),
        new NoMatchesError(TestRoute.get().path, '/bar/foo').message
      );
    });

    it("should throws an error if the href doesn't matches with route by 'exact' flag", () => {
      class TestRoute extends Route {
        public path = '/foo';
      }

      assert.throws(
        () => TestRoute.get().parse('/foo/bar'),
        new NoMatchesError(TestRoute.get().path, '/foo/bar').message
      );
    });

    it("should works if the href doesn't match with route but 'isThrow' is false", () => {
      class TestRoute extends Route {
        public path = '/foo';
      }

      const value = TestRoute.get().parse('/bar', false);
      assert.isUndefined(value);
    });

    it("should works if the href doesn't match with route by 'exact' flag but 'isThrow' is false", () => {
      class TestRoute extends Route {
        public path = '/foo';
        public exact = true;
      }

      const value = TestRoute.get().parse('/foo/bar', false);
      assert.isUndefined(value);
    });
  });

  describe('isActive', () => {
    it('should be true if location is matches with route', () => {
      const Component: FC = () => null;

      class TestRoute extends Route {
        public component = Component;
        public path = '/foo';
      }

      render('/foo', TestRoute);
      assert.isTrue(TestRoute.get().isActive);
    });

    it("should be false if location doesn't match with route", () => {
      const Component: FC = () => null;

      class TestRoute extends Route {
        public component = Component;
        public path = '/bar';
      }

      render('/foo', TestRoute);
      assert.isFalse(TestRoute.get().isActive);
    });
  });

  describe('params', () => {
    it('should be empty object if route has no parameters', () => {
      const component: FC = () => null;

      class TestRoute extends Route {
        public component = component;
        public path = '/';
      }

      render('/', TestRoute);

      const value = TestRoute.get().params;
      assert.ownInclude(value, {});
    });

    it('should be non-empty object if route has any parameters', () => {
      const component: FC = () => null;

      type Params = { bar: string };

      class TestRoute extends Route<Params> {
        public component = component;
        public path = '/:bar';
      }

      render('/bar', TestRoute);

      const value = TestRoute.get().params;
      assert.ownInclude(value, { bar: 'bar' });
    });
  });
});
