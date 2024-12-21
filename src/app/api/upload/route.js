export async function POST(req){
    const Formdata = await req.formdata();
    const image = Formdata.get('image')
    const name = Formdata.get('name');
    return new Response(JSON.stringify({name: name}))
}