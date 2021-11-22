export default function (context) {
  // 認証されていないユーザーの場合、リダイレクト
  console.log(!context.store.getters.isAuthenticated)
  if (!context.store.getters.isAuthenticated) {
    context.redirect('/login')
  }
}