<script setup>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

toast("Saved successfully ", {
  "theme": "colored",
  "type": "success",
  "dangerouslyHTMLString": true
}),
toast("Hello! Wow so easy!", {
  "theme": "colored",
  "type": "warning",
  "dangerouslyHTMLString": true
})

</script>