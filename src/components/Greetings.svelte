<script lang="ts">
    const currentTime: Date = new Date()
    const currentHour: number = currentTime.getHours()

    let greeting = ""

    if(currentHour < 12){
        greeting = "Buenos Días"
    } else if( currentHour < 18) {
        greeting = "Buenas Tardes"
    } else {
        greeting = "Buenas Noches"
    }
</script>

<h1 class="text-4xl font-bold">
    {greeting}
</h1>