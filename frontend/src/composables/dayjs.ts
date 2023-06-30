import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

const useDayjs = () => {
    dayjs.locale('pt-br')
    return dayjs
};

export default useDayjs