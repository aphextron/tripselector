 <?php 

$data = file_get_contents("./data/tourModels.json");
$tourInfo = json_decode($data, true);
$compare = ($_GET);


function distance($a, $compare_with) {
    $in_common = 0;
    foreach ($compare_with as $key => $value) {
        $in_common += ($value == $a[$key]);
    }
    return $in_common;
}

function most_in_common($object_list, $compare_with) {
    $in_common = array();
    foreach ($object_list as $key => $val) {
        $in_common[$key] = distance($val, $compare_with);
    }
    return $object_list[array_search(max($in_common), $in_common)]["id"];
}


var_dump(most_in_common($tourInfo, $compare));


?>