import React from 'react';
import IconMenu from './IconMenu';
import IconMenuItem from './IconMenuItem';

test('Render an IconMenu and on click ensure it renders correctly', () => {
  const wrapper = mount(
    <IconMenu>
      <IconMenuItem
        key="hello"
        icon="refresh"
        onClick={() => null}
        value="hello"
        caption="hello"
      />
      <IconMenuItem
        key="world"
        icon="refresh"
        onClick={() => null}
        value="world"
        caption="world"
      />
    </IconMenu>
  );
  expect(wrapper).toMatchSnapshot();
  wrapper.find('[data-react-toolbox="button"]').simulate('click');
  expect(wrapper).toMatchSnapshot();
});
