const { build,buildSync,serve}  = require("esbuild")

async function runBuild(){
    const result = await build({
        absWorkingDir:process.cwd(),
        entryPoints:["./src/index.jsx"],
        outdir:"dist",
        bundle:true,
        format:"esm",
        external:[],
        splitting:true,
        sourcemap:true,
        metafile:true,
        minify:false,
        watch:false,
        write:false,
        loader:{
            '.png':"base64"
        }
    })
    console.log(result)
}
runBuild()