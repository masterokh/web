const noticeFromStorage = JSON.parse(localStorage.getItem("notice")) || [];

noticeFromStorage.forEach(item => {
    const { theme, text, id } = item;
    drawNotice(theme, text, id);
})

function addNotice() {
    const notice = JSON.parse(localStorage.getItem("notice")) || [];

    const theme = document.getElementById("input-theme").value;
    const text = document.getElementById("input-text").value;
    const id = Math.random().toString(16).slice(2);

    if (theme === '' || text === '') {
        Swal.fire({
            icon: 'error',
            title: 'Ошибка',
            text: 'Заполните все поля',
            iconColor: '#ff5f5f',
            confirmButtonColor: '#cfcfcf',
            timer: 60000
        });

        return;
    }

    notice.push({ id, theme: theme, text: text });
    localStorage.setItem("notice", JSON.stringify(notice));

    document.getElementById("input-theme").value = "";
    document.getElementById("input-text").value = "";

    drawNotice(theme, text, id);
}

function deleteNotice() {
    event.preventDefault();
    const notice = document.getElementById("notice-list");

    if (notice.innerHTML.trim()) {
        notice.innerHTML = "";

        Swal.fire({
            icon: 'success',
            title: 'Успешно',
            text: 'Заметки удалены',
            confirmButtonColor: '#cfcfcf',
            timer: 60000
        });

        localStorage.removeItem('notice');
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Ошибка',
            text: 'Добавьте заметку',
            iconColor: '#ff5f5f',
            confirmButtonColor: '#cfcfcf',
            timer: 60000
        });
    }
}

function drawNotice(theme, text, id) {
    const currentNotice = document.createElement("li");
    currentNotice.dataset.id = id;
    currentNotice.textContent = `(${theme}): ${text}`;

    const removeButton = document.createElement("span");
    removeButton.className = "remove-button";
    removeButton.textContent = "\u00D7";

    removeButton.addEventListener('click', () => {
        Swal.fire({
            title: 'Вы уверены?',
            text: 'Вы не сможете отменить это действие',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Удалить',
            cancelButtonText: 'Отменить',
            confirmButtonColor: '#cfcfcf',
            cancelButtonColor: '#cfcfcf',
            timer: 60000
        }).then((result) => {
            if (result.isConfirmed) {
                currentNotice.style.display = "none";
                let oldNotice = JSON.parse(localStorage.getItem("notice"));
                let updatedNotice = removeObjectById(oldNotice, currentNotice.dataset.id);
                localStorage.setItem("notice", JSON.stringify(updatedNotice));

                Swal.fire({
                    icon: 'success',
                    title: 'Успешно',
                    text: 'Заметка удалена',
                    confirmButtonColor: '#cfcfcf',
                    timer: 60000
                });
            }
        });
    });

    currentNotice.appendChild(removeButton);

    document.getElementById("notice-list").appendChild(currentNotice);
}

function removeObjectById(array, id) {
    const object = array.findIndex((item) => item.id === id);

    if (object > -1) {
        array.splice(object, 1);
    }

    return array;
}
