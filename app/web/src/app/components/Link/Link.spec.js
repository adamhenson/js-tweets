import React from 'react';
import Link from './Link';

test('Render a router link', () => {
  const wrapper = shallow(
    <Link to="http://www.google.com">foo bar</Link>
  );
  expect(wrapper.prop('to')).toEqual('http://www.google.com');
});

test('Render a router nav link', () => {
  const wrapper = shallow(
    <Link to="http://www.google.com" isNavLink>foo bar</Link>
  );
  expect(wrapper).toMatchSnapshot();
});
