import Vue from 'vue';
import i18n from '../lang' // Internationalization
// 数字加千分符
Vue.filter('thousand', function (value) {
    return Number(value).toLocaleString();
});
