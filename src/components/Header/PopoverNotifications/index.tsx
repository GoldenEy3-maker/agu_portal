import { BiBell, BiCheckDouble } from "react-icons/bi"
import Button from "~/components/Button"
import * as Popover from "~/components/Popover"

const PopoverNotifications: React.FC = () => {
  return (
    <Popover.Root>
      <Popover.Trigger type="button" asIcon color="default">
        <BiBell />
      </Popover.Trigger>
      <Popover.Wrapper>
        <Popover.Header>
          <Popover.Title>Уведомления</Popover.Title>
          <Button type="button" asIcon color="default">
            <BiCheckDouble />
          </Button>
        </Popover.Header>
        <Popover.Content>
          <ul>
            <li>Уведомление 1</li>
            <li>Уведомление 2</li>
            <li>Уведомление 3</li>
            <li>Уведомление 4</li>
          </ul>
        </Popover.Content>
      </Popover.Wrapper>
    </Popover.Root>
  )
}

export default PopoverNotifications
