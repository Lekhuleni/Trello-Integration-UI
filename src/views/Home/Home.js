import ListBlock from "../../components/ListBlock/ListBlock.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    ListBlock
  },
  async created() {
    const tempList = await this.getLists();
    console.log(tempList);
    tempList.forEach(async list => {
      const cards = await this.getCards(list.id);
      this.lists.push({
        ...list,
        cards: cards
      });
    });
  },
  data: () => ({
    lists: []
  }),
  methods: {
    async getLists() {
      return await axios
        .get("http://localhost:8083/api/v1/board/lists")
        .then(response => {
          return response.data;
        });
    },
    async getCards(listId) {
      return await axios
        .get(`http://localhost:8083/api/v1/board/lists/cards/${listId}`)
        .then(response => {
          return response.data;
        });
    }
  }
};
