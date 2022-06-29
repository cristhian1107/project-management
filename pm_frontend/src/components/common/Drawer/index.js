// Utils and parts of the component
import { links } from 'components/common/utils';
import BasicLayout from 'components/common/Drawer/BasicLaoyut';
import StylesNavItem from 'components/common/Drawer/styles/StyleNavItem';

export default function LeftDrawer () {

  return (
    <BasicLayout>
      {
        links.map(link => <StylesNavItem {...link} key={link.key}/>)
      }
    </BasicLayout>
  );
}
