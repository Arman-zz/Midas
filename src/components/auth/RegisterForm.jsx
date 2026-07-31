export default function RegisterForm({ hidden = false, onSubmit }) {
  return <form hidden={hidden} onSubmit={onSubmit}><input name="name" required /><input name="email" type="email" required /><input name="password" type="password" required /><button type="submit">Create account</button></form>
}
