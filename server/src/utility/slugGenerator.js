const slugGenerator=(title)=>{
    return title.toLowerCase().replace(/\s+/g,'-')
}
module.exports = slugGenerator