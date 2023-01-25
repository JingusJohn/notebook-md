<script lang="ts">

</script>

<div class="flex flex-col items-center">
  <h1 class="text-3xl dark:text-white">Create Account</h1>
  <form action="?/signup" method="POST" class="flex flex-col">
    <label for="" class="dark:text-white">Email</label>
    <input type="text" name="email" class="px-2 rounded-lg bg-gray-200 outline-black dark:bg-slate-800 dark:text-white focus:outline-red-200" />
    <!-- <label for="" class="dark:text-white">First Name</label> -->
    <!-- <input type="text" name="firstName" class="px-2 rounded-lg bg-gray-200 outline-black dark:bg-slate-800 dark:text-white focus:outline-red-200" /> -->
    <label for="" class="dark:text-white">Password</label>
    <input type="password" name="password" class="px-2 rounded-lg bg-gray-200 dark:bg-slate-800 dark:text-white focus:outline-red-200" />
    <label for="" class="dark:text-white">Confirm Password</label>
    <input type="password" name="passwordConfirm" class=" px-2 rounded-lg bg-gray-200 dark:bg-slate-800 dark:text-white focus:outline-red-200" />
    <button type="submit" class="dark:text-white bg-blue-500 rounded-lg mt-4">Sign Up</button>
  </form>

  <div class="dark:text-white">Already have an account? <a class="text-blue-500" href="/login">Sign In</a></div>

  <!-- TODO: Need to handle and show errors when user provides bad input -->

</div>
