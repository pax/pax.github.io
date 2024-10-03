
    const dataRoot = 'audio/';
    const listfile = dataRoot + 'sounds.csv';
    const tagList = document.getElementById('tag-list');
    const audioList = document.getElementById('audio-list');
    const selectedTagsDiv = document.getElementById('selected-tags');
    const childThemesDiv = document.getElementById('child-themes');
    let audioData = [];
    let allTags = new Set();
    let currentlyPlaying = null;
    let activeTags = new Set();
    let progressBar = document.getElementById('progress-bar');
    function parseCSV(csv) {
        const lines = csv.split('\n').filter(line => line.trim() !== '');
        const headers = lines[0].split(',').map(h => h.trim());
        return lines.slice(1).map(line => {
            const values = [];
            let inQuotes = false;
            let currentValue = '';
            for (let char of line) {
                if (char === '"') {
                    inQuotes = !inQuotes;
                } else if (char === ',' && !inQuotes) {
                    values.push(currentValue.trim());
                    currentValue = '';
                } else {
                    currentValue += char;
                }
            }
            values.push(currentValue.trim());
            return headers.reduce((obj, header, index) => {
                obj[header] = values[index].replace(/^"(.*)"$/, '$1');
                return obj;
            }, {});
        }).filter(item => item.slug && item.title);
    }
    function renderAudioItems(items) {
        audioList.innerHTML = items.map(item => {
            const itemTags = item.tags ? item.tags.split(',').map(t => t.trim()) : ['Uncategorized'];
            const displayTags = itemTags.filter(t => !activeTags.has(t));
            let thebcg = ''
            if (item.thumb && item.thumb !== 'null') {
                thebcg = ` style="background-image: url(${dataRoot}thumbs/${item.thumb}); " `;
            }

            return `
                <div class="audio-item" data-tags="${item.tags || ''}" data-slug="${item.slug}" ${thebcg}>                                  
                    <h3>${splitTitle(item.title, 17)}</h3>                
                    <div class="item-tags">
                        ${displayTags.map(tag => `<span class="item-tag">${tag}</span>`).join('')}
                    </div>
                    <audio preload="auto">
                        <source src="${dataRoot}ogg/${item.slug}.ogg" type="audio/ogg">
                        <source src="${dataRoot}mp3/${item.slug}.mp3" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                </div>
            `;
        }).join('');
        audioList.innerHTML = "<div id=\"xcanvas\" class=\"audio-item\" ><span id=\"renderer-placeholder\">🔉</span></div>" + audioList.innerHTML;
        // TODO: add event listeners to audio items
        document.querySelectorAll('.audio-item').forEach(item => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.audio-item').forEach(item => { item.classList.remove('playing'); });
                const audioSlug = item.dataset.slug;
                window.history.replaceState({}, '', window.location.pathname + window.location.search + '#' + Array.from(activeTags).join('+') + '::' + audioSlug);
                toggleAudio(item);

                renderer = document.getElementById('xcanvas');
                renderer.innerHTML = renderItem(audioData.find(x => x.slug == audioSlug));

                renderer.addEventListener('click', () => {
                    document.querySelectorAll('.audio-item').forEach(item => { item.classList.remove('playing'); });
                    const audioSlug = item.dataset.slug;
                    window.history.replaceState({}, '', window.location.pathname + window.location.search + '#' + Array.from(activeTags).join('+') + '::' + audioSlug);
                    toggleAudio(item);
                });
            });
        });
    }
    function renderItem(xitem) {
        let thebcg = ''
        if (xitem && xitem.thumb && xitem.thumb !== 'null') {
            thebcg = ` style="background-image: url(${dataRoot}thumbs/${xitem.thumb}); " `;
        }
        return `
                <div class="audio-item playing xplaying" data-tags="${xitem.tags || ''}" data-slug="${xitem.slug}" ${thebcg}>                                  
                    <h3>${splitTitle(xitem.title, 17)}</h3>                   
                    <audio preload="auto">
                        <source src="${dataRoot}ogg/${xitem.slug}.ogg" type="audio/ogg">
                        <source src="${dataRoot}mp3/${xitem.slug}.mp3" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                </div>
            `;
    }
    function toggleAudio(item) {
        const audio = item.querySelector('audio');
        if (currentlyPlaying && currentlyPlaying !== audio) {
            currentlyPlaying.pause();
            currentlyPlaying.currentTime = 0;
            currentlyPlaying.parentNode.classList.remove('playing');
            currentlyPlaying.removeEventListener('timeupdate', updateProgressBar);
        }
        if (audio.paused) {
            audio.play();
            item.classList.add('playing');
            currentlyPlaying = audio;
            currentlyPlaying.addEventListener('timeupdate', updateProgressBar);
        } else {
            audio.pause();
            audio.currentTime = 0;
            item.classList.remove('playing');
            currentlyPlaying = null;
            progressBar.style.width = '0%';
        }
    }
    function updateProgressBar() {
        if (currentlyPlaying && progressBar) {
            const progress = (currentlyPlaying.currentTime / currentlyPlaying.duration) * 100;
            progressBar.style.width = `${progress}%`;
        }
    }

    // temporarily bypassed
    
    function renderTags() {
        // const sortedTags = Array.from(allTags).sort();
        // tagList.innerHTML = sortedTags.map(tag => `
        //     <span class="tag" data-tag="${tag}">${tag}</span>
        // `).join('');
        const ziTags = ["yes", "no", "meeting", "excuses", "happy", "enthusiasm", "supportive", "winning", "sarcasm", "angry", "dismissive", "insult", "laugh", "fail", "danger", "desperation", "confusion", "impatience", "action",  "sad",  "sexy", "ringtone", "theme-song", "fart", "gun", "foley", "suspense", "song"]
        tagList.innerHTML = ziTags.map(tag => `
            <span class="tag" data-tag="${tag}">${tag}</span>
        `).join('');

        

        // const allTag = document.createElement('span');
        // allTag.className = 'tag';
        // allTag.textContent = 'All';
        // allTag.dataset.tag = 'all';
        // const resetTags = document.createElement('span');
        // resetTags.className = 'tag';
        // resetTags.innerHTML = '#';
        // resetTags.dataset.tag = '';
        // tagList.insertBefore(resetTags, tagList.firstChild);
        // tagList.appendChild(allTag);
        document.querySelectorAll('.tag').forEach(tag => {
            tag.addEventListener('click', () => handleTagClick(tag));
        });
    }

   


    function handleTagClick(clickedTag) {
        const tag = clickedTag.dataset.tag;
        if (tag === 'all') {
            activeTags.clear();
        } else if (clickedTag.classList.contains('active')) {
            activeTags.delete(tag);
        } else if (clickedTag.classList.contains('highlighted')) {
            activeTags.add(tag);
        } else {
            activeTags.clear();
            activeTags.add(tag);
        }
        updateTitle();
        filterAudioItems();
        updateTagHighlights();
        updateSelectedTags();
        updateUrlHash();
        document.getElementById('xcanvas').scrollIntoView({ behavior: 'smooth' });
    }
    function updateTitle() {
        const baseTitle = "🔉💥b01ng.club🤺";
        if (activeTags.size === 0) {
            document.title = baseTitle;
        } else {
            const tagString = Array.from(activeTags).join(' + ');
            document.title = `${tagString} - ${baseTitle}`;
            document.body.className = `${tagString}` + ' _filtered ';
        }
    }
    function updateTagHighlights() {
        document.querySelectorAll('.tag').forEach(tag => {
            tag.classList.remove('active', 'highlighted');
            if (activeTags.has(tag.dataset.tag)) {
                tag.classList.add('active');
            }
        });
        if (activeTags.size > 0) {
            const relatedTags = new Set();
            audioData.forEach(item => {
                const itemTags = item.tags ? item.tags.split(',').map(t => t.trim()) : ['Uncategorized'];
                if (activeTags.size === itemTags.filter(t => activeTags.has(t)).length) {
                    itemTags.forEach(t => relatedTags.add(t));
                }
            });
            document.querySelectorAll('.tag').forEach(tag => {
                if (relatedTags.has(tag.dataset.tag) && !activeTags.has(tag.dataset.tag)) {
                    tag.classList.add('highlighted');
                }
            });
        }
    }
    function updateSelectedTags() {
        if (activeTags.size === 0) {
            selectedTagsDiv.innerHTML = '' + '';
            childThemesDiv.textContent = '';
        } else {
            const tagArray = Array.from(activeTags);
            const filteredItems = audioData.filter(item => {
                const itemTags = item.tags ? item.tags.split(',').map(t => t.trim()) : ['Uncategorized'];
                return activeTags.size === itemTags.filter(t => activeTags.has(t)).length;
            });
            selectedTagsDiv.innerHTML = `<b>${tagArray.join(' + ')}</b>` + ` ` + `<small>(${filteredItems.length})</small>` + ' ';
            const childThemes = new Set();
            filteredItems.forEach(item => {
                const itemTags = item.tags ? item.tags.split(',').map(t => t.trim()) : ['Uncategorized'];
                itemTags.forEach(tag => {
                    if (!activeTags.has(tag)) childThemes.add(tag);
                });
            });
            childThemesDiv.innerHTML = Array.from(childThemes).map(tag => ` <span class="item-tag">${tag}</span> `).join('');
        }
    }
    function filterAudioItems() {
        const filteredItems = audioData.filter(item => {
            if (activeTags.size === 0) return true;
            const itemTags = item.tags ? item.tags.split(',').map(t => t.trim()) : ['Uncategorized'];
            return activeTags.size === itemTags.filter(t => activeTags.has(t)).length;
        });
        renderAudioItems(filteredItems);
    }
    function updateUrlHash() {
        const hashValue = Array.from(activeTags).join('+');
        window.history.replaceState(null, null, hashValue ? `#${hashValue}` : '#');
    }
    function markActiveAudio(xslug) {
        document.querySelectorAll('.audio-item').forEach(item => {
            item.classList.remove('playing');
            if (item.dataset.slug == xslug) {
                item.classList.add('playing');

                document.getElementById('xcanvas').scrollIntoView({ behavior: 'smooth' });

                renderer = document.getElementById('xcanvas');
                renderer.innerHTML = renderItem(audioData.find(x => x.slug == xslug));
                renderer.addEventListener('click', () => {
                    document.querySelectorAll('.audio-item').forEach(item => { item.classList.remove('playing'); });
                    const audioSlug = item.dataset.slug;
                    window.history.replaceState({}, '', window.location.pathname + window.location.search + '#' + Array.from(activeTags).join('+') + '::' + audioSlug);
                    toggleAudio(item);
                });
                // renderer.innerHTML = renderItem(item);
            }
        });
    }
    function scrollToAudioList() {
        if (window.location.hash) {
            const audioListElement = document.getElementById('top');
            if (audioListElement) {
                audioListElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
    function applyFilterFromHash() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            zz = hash.split('::')
            const filterTags = zz[0].split('+');
            activeTags = new Set(filterTags);
            filterAudioItems();
            updateTagHighlights();
            updateSelectedTags();
            if (zz.length > 1) {
                const audioSlug = zz[1];
                markActiveAudio(audioSlug);
            }
        }
    }
    function splitTitle(title, breakpoint) {
        const words = title.split(' ');
        if (words.length == 1) {
            return title;
        }
        if (words.length == 2 && title.length >= 10) {
            return words[0] + '<br>' + words[1];
        }
        let firstHalf = words[0];
        let charCount = words[0].length;
        const midpoint = Math.min(title.length / 2, breakpoint);
        for (let i = 1; i < words.length; i++) {
            if (charCount + 1 + words[i].length > midpoint || i === words.length - 1) {
                if (i === words.length - 1 && charCount + 1 + words[i].length <= breakpoint) {
                    return firstHalf + ' ' + words[i];
                } else {
                    return firstHalf + '<br>' + words.slice(i).join(' ');
                }
            }
            firstHalf += ' ' + words[i];
        }
    }


    fetch(listfile)
        .then(response => response.text())
        .then(csv => {
            audioData = parseCSV(csv);
            audioData.forEach(item => {
                if (item.tags) {
                    item.tags.split(',').forEach(tag => {
                        const trimmedTag = tag.trim();
                        if (trimmedTag) allTags.add(trimmedTag);
                    });
                } else {
                    allTags.add('Uncategorized');
                }
            });
            allTags.add('Uncategorized');
            renderTags();
            applyFilterFromHash();
            if (activeTags.size === 0) {
                updateSelectedTags();
            }
        })
        .catch(error => {
            console.error('Error loading CSV:', error);
            audioList.innerHTML = '<p>Error loading audio data. Please try again later.</p>';
        });
    window.addEventListener('hashchange', applyFilterFromHash);
    document.querySelectorAll('.audio-item').forEach(item => {
        const audio = item.querySelector('audio');
        audio.addEventListener('ended', () => {
            item.classList.remove('playing');
            currentlyPlaying = null;
            progressBar.style.width = '0%';
        });
    });
    document.getElementById('share').addEventListener('click', function () {
        const urlToShare = window.location.href;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(urlToShare).then(() => {
                const message = document.createElement('div');
                message.textContent = 'Url copied to clipboard';
                message.className = 'xmessage';
                document.body.appendChild(message);
                setTimeout(() => {
                    document.body.removeChild(message);
                }, 1500);
            }).catch(err => {
                console.error('Failed to copy URL: ', err);
                fallBackCopy(urlToShare);
            });
        } else {
            fallBackCopy(urlToShare);
        }
        function fallBackCopy(text) {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                const message = document.createElement('div');
                message.textContent = 'Url copied to clipboard';
                message.className = 'xmessage';
                document.body.appendChild(message);
                setTimeout(() => {
                    document.body.removeChild(message);
                }, 1500);
            } catch (err) {
                console.error('Fallback copy failed: ', err);
            }
            document.body.removeChild(textArea);
        }
    });
    function isElementOutOfViewport(element) {
        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        return rect.bottom < 0 || rect.top > viewportHeight;
    }

    // Assuming you have an element with the ID "myElement"
    const zeTagList = document.getElementById("tag-list");
    const toggleCtgs = document.getElementById("toggle-ctgs");


    window.addEventListener("scroll", () => {
        if (isElementOutOfViewport(zeTagList)) {
            toggleCtgs.classList.add('shown');
        } else {
            toggleCtgs.classList.remove('shown');
        }
    });
    function scrollToId(id) {
        console.log(id)   
        const element = document.getElementById(id);
        if (element) {
            // element.scrollIntoView({ behavior: 'smooth' });
            element.scrollIntoView();
        }
    }
