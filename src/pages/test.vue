<template>
  <div>
    tests
  </div>
</template>

<script>
import location_new from "@/data/locations.json";
export default {
  data() {
    return {
      locations: [],
    };
  },
  async mounted() {
    location_new.forEach(async (element, index) => {
      if (
        [
          "กรุงเทพมหานคร",
          "กำแพงเพชร",
          "ชัยนาท",
          "นครนายก",
          "นครปฐม",
          "นครสวรรค์",
          "นนทบุรี",
          "ปทุมธานี",
          "พระนครศรีอยุธยา",
          "พิจิตร",
          "พิษณุโลก",
          "เพชรบูรณ์",
          "ลพบุรี",
          "สมุทรปราการ",
          "สมุทรสาคร",
          "สมุทรสงคราม",
          "สิงห์บุรี",
          "สุโขทัย",
          "สุพรรณบุรี",
          "สระบุรี",
          "อ่างทอง",
          "อุทัยธานี",
        ].includes(element.PROVINCE_NAME)
      ) {
        location_new[index].GEO_NAME = await "ภาคกลาง";
      } else if (
        [
          "เชียงราย",
          "เชียงใหม่",
          "น่าน",
          "พะเยา",
          "แพร่",
          "แม่ฮ่องสอน",
          "ลำปาง",
          "ลำพูน",
          "อุตรดิตถ์",
        ].includes(element.PROVINCE_NAME)
      ) {
        location_new[index].GEO_NAME = await "ภาคเหนือ";
      } else if (
        [
          "กาฬสินธุ์",
          "ขอนแก่น",
          "ชัยภูมิ",
          "นครพนม",
          "นครราชสีมา",
          "บึงกาฬ",
          "บุรีรัมย์",
          "มหาสารคาม",
          "มุกดาหาร",
          "ยโสธร",
          "ร้อยเอ็ด",
          "เลย",
          "สกลนคร",
          "สุรินทร์",
          "ศรีสะเกษ",
          "หนองคาย",
          "หนองบัวลำภู",
          "อุดรธานี",
          "อุบลราชธานี",
          "อำนาจเจริญ",
        ].includes(element.PROVINCE_NAME)
      ) {
        location_new[index].GEO_NAME = await "ภาคตะวันออกเฉียงเหนือ";
      } else if (
        [
          "จันทบุรี",
          "ฉะเชิงเทรา",
          "ชลบุรี",
          "ตราด",
          "ปราจีนบุรี",
          "ระยอง",
          "สระแก้ว",
        ].includes(element.PROVINCE_NAME)
      ) {
        location_new[index].GEO_NAME = await "ภาคตะวันออก";
      } else if (
        ["กาญจนบุรี", "ตาก", "ประจวบคีรีขันธ์", "เพชรบุรี", "ราชบุรี"].includes(
          element.PROVINCE_NAME
        )
      ) {
        location_new[index].GEO_NAME = await "ภาคตะวันตก";
      } else if (
        [
          "กระบี่",
          "ชุมพร",
          "ตรัง",
          "นครศรีธรรมราช",
          "นราธิวาส",
          "ปัตตานี",
          "พังงา",
          "พัทลุง",
          "ภูเก็ต",
          "ระนอง",
          "สตูล",
          "สงขลา",
          "สุราษฎร์ธานี",
          "ยะลา",
        ].includes(element.PROVINCE_NAME)
      ) {
        location_new[index].GEO_NAME = await "ภาคใต้";
      }
    });
    setTimeout(() => {
      console.log("location_new", JSON.stringify(location_new));
    }, 10000);
  },
};
</script>

<style lang="scss" scoped></style>
