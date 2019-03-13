import { Component, Vue } from 'vue-property-decorator';
import './Home.scss';

@Component({
    template: require('./Home.html'),
    })
export default class Home extends Vue {
}
