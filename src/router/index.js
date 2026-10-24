import { createRouter, createWebHistory } from 'vue-router'
import CoursesListPage from '../pages/CoursesListPage.vue'
import CoursePage from '../pages/CoursePage.vue'
import CourseDescriptionPage from '../pages/CourseDescriptionPage.vue'
import CourseProgramPage from '../pages/CourseProgramPage.vue'
import CourseReviewsPage from '../pages/CourseReviewsPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import DashboardPage from '../pages/DashboardPage.vue'
import NotFoundPage from '../pages/NotFoundPage.vue'

const routes = [
  { path: '/', redirect: '/courses' },
  { path: '/courses', name: 'Courses', component: CoursesListPage },
  {
    path: '/courses/:id',
    component: CoursePage,
    props: true,
    children: [
      { path: '', redirect: { name: 'CourseDescription' } },
      { path: 'description', name: 'CourseDescription', component: CourseDescriptionPage },
      { path: 'program', name: 'CourseProgram', component: CourseProgramPage },
      { path: 'reviews', name: 'CourseReviews', component: CourseReviewsPage },
    ]
  },
  { path: '/login', name: 'Login', component: LoginPage, meta: { guestOnly: true } },
  { path: '/dashboard', name: 'Dashboard', component: DashboardPage, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuth = localStorage.getItem('authToken') === 'demo'
  if (to.meta.requiresAuth && !isAuth) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else if (to.meta.guestOnly && isAuth) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router