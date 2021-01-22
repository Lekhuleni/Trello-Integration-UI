import TrelloCard from "../../components/Trello-Card/TrelloCard.vue";
import axios from "axios";

export default {
  name: "ListBlock",
  components: {
    TrelloCard
  },
  props: {
    list: Object
  },
  data: () => ({
    dialog: false,
    name: ""
  }),
  methods: {
    async addCard() {
      const newCard = await this.createCard();
      this.list.cards.push(newCard);
      this.dialog = false;
      this.name = "";
    },
    async createCard() {
      return await axios
        .post(`http://localhost:8083/api/v1/board/lists/create-card`, {
          name: this.name,
          listId: this.list.id
        })
        .then(response => {
          return response.data;
        });
    }
  }
};
