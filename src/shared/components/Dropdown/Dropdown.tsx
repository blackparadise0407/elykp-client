import RcTooltip from 'rc-tooltip';
import { TooltipProps } from 'rc-tooltip/lib/Tooltip';

type DropdownProps = TooltipProps;

export default function Dropdown({ ...rest }: DropdownProps) {
  return (
    <RcTooltip
      trigger={['click']}
      destroyTooltipOnHide
      overlayClassName="w-fit bg-white rounded shadow"
      {...rest}
    />
  );
}
