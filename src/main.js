import Vue from 'vue'
import App from './App'
import router from './router/index'
import axios from 'axios'
import store from './store/index'
import VueParticles from 'vue-particles'
import './mock/mock'
import i18n from './lang' // Internationalization
// import './directives/customTitle.js'//自定义指令
import customComponents from'./components/customComponents.js'
import Messager from './common/Messager.js'

import 'font-awesome/less/font-awesome.less'

import './permission' // permission control

import {
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  DatePicker,
  Button,
  ButtonGroup,
  Popover,
  Tooltip,
  Form,
  FormItem,
  Tabs,
  BreadcrumbItem,
  Breadcrumb,
  TabPane,
  Tag,
  Icon,
  Row,
  Col,
  Card,
  Rate,
  Cascader,
  Loading,
  Dialog,
  // MessageBox,
  Pagination,
  Message
} from 'element-ui'
// 框架



// 样式

//工具

Vue.use(Autocomplete)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(DatePicker)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Popover)
Vue.use(Tooltip)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(TabPane)
Vue.use(Tag)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Rate)
Vue.use(Cascader)
Vue.use(Pagination)
// Vue.use(Message)
Vue.use(Dialog)


Vue.use(Loading.directive)

Vue.use(VueParticles)

Vue.use(customComponents)

// 消除Message自动弹框问题
Vue.component(Message.name, Message)

Vue.prototype.$loading = Loading.service
// Vue.prototype.$msgbox = MessageBox
// Vue.prototype.$confirm = MessageBox.confirm
// Vue.prototype.$prompt = MessageBox.prompt
// Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$message = Message

Vue.prototype.$axios = axios

Vue.config.productionTip = false

axios.defaults.baseURL = 'api/v1/'

const thisVm = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

// const thisVm = new Vue({
//   el: '#app',
//   i18n,
//   router,
//   store,
//   template: '<App/>',
//   components: { App }
// })

Vue.prototype.$messager = new Messager(thisVm);
