// Utils and parts of the component
import { links } from 'components/utils';
import BasicLayout from 'components/drawer/basicLaoyut';
import StylesNavItem from 'components/drawer/styles/styleNavItem';

export default function LeftDrawer () {

  return (
    <BasicLayout>
      {
        links.map(link => <StylesNavItem {...link} key={link.key}/>)
      }
    </BasicLayout>
  );
}
