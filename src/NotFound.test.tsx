import React from 'react';
import { renderToString } from 'react-dom/server';
import { assert } from 'chai';

import { Router } from './Router';
import { NotFound } from './NotFound';

describe('NotFound', () => {
  it('should displays a page 404 on the second render', () => {
    const Foo = () => <NotFound />;
    const Bar = () => <div>Bar</div>;

    const root = <Router application={Foo} notFound={Bar} />;

    renderToString(root);
    const result = renderToString(root);

    assert.equal(result, '<div>Bar</div>');
  });
});
