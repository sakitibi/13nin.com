document.getElementById('SNWInstall-zip').addEventListener('click', function() {
    openPopupzip();
    // Add your game start logic here
    });
document.getElementById('SNWInstall-7z').addEventListener('click', function() {
    openPopup7z();
    // Add your game start logic here
    });
function openPopupzip() {
  window.open("https://sakitibi-com9.webnode.jp/api/sknewroles/login/16412cdd-df6d-2d96-78e6-85da9563bf5e/", "popupWindow", "width=800,height=600");
}

function openPopup7z() {
  window.open("https://sakitibi-com9.webnode.jp/api/sknewroles/login/4dd55279-eec9-761c-39b4-ec0afa14336f/", "popupWindow", "width=800,height=600");
}

document.getElementById("dl").addEventListener("click", function() {
    location.href = "https://sakitibi.github.io/12nin.com/SKNewRoles.html";
});
