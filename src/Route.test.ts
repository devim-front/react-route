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

  describe('redirect', () => {});
  describe('replace', () => {});
});
