
// title animation

$(".portfolio-box-caption").addClass("hidden");

$(".portfolio-box" )
.mouseover(function() {
	$( this ).find(".portfolio-box-caption").removeClass("hidden").addClass("visible");
}).mouseleave(function() {
	$( this ).find(".portfolio-box-caption").removeClass("visible").addClass("hidden");
});

