import { useMemo, useRef } from "react"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { BiCog, BiLock, BiLockAlt, BiUser } from "react-icons/bi"
import Button from "~/components/Button"
import * as Form from "~/components/Form"
import Input from "~/components/Input"
import * as Modal from "~/components/Modal"
import { useAutoFocus } from "~/hooks/autoFocus.hook"
import { useModalStore } from "~/store/modal"
import { ModalKeys } from "~/utils/enums"
import { ValueOf } from "~/utils/types"

const InputKeys = {
  Login: "login",
  Password: "password",
} as const

type InputKeys = ValueOf<typeof InputKeys>

type HookForm = {
  [K in InputKeys]: string
}

const SingInModal: React.FC = () => {
  const modalStore = useModalStore()
  const loginInputRef = useRef<HTMLInputElement>(null)

  const isModalOpen = useMemo(
    () => modalStore.queue.at(-1) === ModalKeys.SignIn,
    [modalStore.queue]
  )
  const closeModalHandler = () => modalStore.close(ModalKeys.SignIn)

  const hookForm = useForm<HookForm>({
    defaultValues: {
      login: "",
      password: "",
    },
  })

  useAutoFocus(loginInputRef, isModalOpen)

  return (
    <Modal.Root
      state={modalStore.queue.at(-1) === ModalKeys.SignIn}
      closeHandler={closeModalHandler}
    >
      <Modal.Wrapper>
        <Modal.Header>
          <Modal.Title>Войти</Modal.Title>
          <Modal.Close onClick={closeModalHandler} />
        </Modal.Header>
        <Modal.Content>
          <Form.Root
            onSubmit={hookForm.handleSubmit(
              (data) => {
                toast.success(`Ваши данные: ${JSON.stringify(data)}`)
                closeModalHandler()
                hookForm.reset()
              },
              (data) => toast.error(`Ваши данные: ${JSON.stringify(data)}`)
            )}
          >
            <Form.Inputs>
              <Controller
                control={hookForm.control}
                name={InputKeys.Login}
                render={({ field }) => (
                  <Input
                    type="text"
                    label="Логин"
                    id={InputKeys.Login}
                    placeholder="ivanov.202s2"
                    name={field.name}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    value={field.value}
                    ref={loginInputRef}
                    leadingIcon={<BiUser />}
                  />
                )}
              />
              <Controller
                control={hookForm.control}
                name={InputKeys.Password}
                render={({ field }) => (
                  <Input
                    type="password"
                    label="Пароль"
                    id={InputKeys.Password}
                    placeholder="******"
                    name={field.name}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    value={field.value}
                    leadingIcon={<BiLockAlt />}
                  />
                )}
              />
            </Form.Inputs>
            <Form.Actions>
              <Button type="button" onClick={closeModalHandler}>
                Отменить
              </Button>
              <Button type="submit" variant="filled">
                Войти
              </Button>
            </Form.Actions>
          </Form.Root>
        </Modal.Content>
      </Modal.Wrapper>
    </Modal.Root>
  )
}

export default SingInModal
