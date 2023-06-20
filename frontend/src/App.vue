<template>
  <div class="half-screen">
    <div class="ilustration"></div>
    <div class="content">
      <h1>Bem-vindo à Ação de Rua</h1>
      <div class="buttonLogar">
        <button>Logar</button>
      </div>
      <div class="buttonVistante">
        <button>Visitante</button>
      </div>
    </div>
  </div> 
</template>

<style>
.ilustration{
  width: 507.99px;
  height: 507.43px;
  background: url("img/Illustration.png");
  background-position: center center;
  background-size: cover;
  position: absolute;
  top: 236px;
  left: 55px;
}

body {
  box-sizing: border-box;

  position: relative;
  width: 1440px;
  height: 1024px;

  background: #FFFFFF;
  border: 1px solid #000000;
  border-radius: 17px;
}

    .half-screen {
      display: flex;
      flex-direction: row;
      height: 100%;
      width: 100%;
    }

    .half-screen .image {
      flex: 1;
      background-image: url('img/Illustration.png');
      background-size: cover;
      background-position: center;
    }

    .half-screen .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .content h1 {
      position: absolute;
      left: 53.19%;
      right: 12.64%;
      top: 25.98%;
      bottom: 55.47%;

      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 60px;
      line-height: 135.5%;
      /* or 81px */


      /* Black */

      color: #2F2F2F;

    }

    .content .buttonLogar {
      position: absolute;
      left: 68.75%;
      right: 27.78%;
      top: 56.93%;
      bottom: 40.92%;

      font-family: 'Poppins';
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 135.5%;
      /* identical to box height, or 22px */


      color: #FFFFFF;
    }

    .content .buttonLogar button {
      position: relative;
      left: 47.01%;
      right: 6.39%;
      top: 54.3%;
      bottom: 38.18%;

      background: #8A2DD6;
      border-radius: 8px;
    }

</style>