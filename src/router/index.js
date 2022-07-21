import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardView from '../components/HomeScreen.vue'
import SettingsView from '../components/UserSettings.vue'
import MealPlanView from '../components/MealPlans.vue'
import RecipesView from '../components/RecipeDisplay.vue'
import GroceryListView from '../components/GroceryList.vue'
import LoginAndRegister from '../components/LoginAndRegister.vue'
//import { component } from 'vue/types/umd'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: DashboardView
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView
  },
  {
    path: '/meal_plans',
    name: 'mealPlans',
    component: MealPlanView
  },
  {
    path: '/recipes',
    name: 'recipes',
    component: RecipesView
  },
  {
    path: '/grocery_list',
    name: 'groceryList',
    component: GroceryListView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginAndRegister
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
